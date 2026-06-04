import { BackButtonComponent } from "../../components/back-button/index.js";
import { CashbackDetailsComponent } from "../../components/cashback-details/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { cashbackUrls } from "../../modules/cashbackUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `
            <div class="container py-4">
                <div id="product-page" class="d-flex flex-column gap-4"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    showLoading() {
        this.pageRoot.insertAdjacentHTML("beforeend", `
            <div class="loading-text">Загрузка карточки...</div>
        `);
    }

    showError() {
        this.pageRoot.insertAdjacentHTML("beforeend", `
            <div class="error-text text-danger">
                Карточка не найдена или backend не отвечает.
            </div>
        `);
    }

    renderData(data) {
        const loading = this.pageRoot.querySelector(".loading-text");

        if (loading) {
            loading.remove();
        }

        const details = new CashbackDetailsComponent(this.pageRoot);
        details.render(data, () => this.deleteCashback());
    }

    getData() {
        this.showLoading();

        ajax.get(cashbackUrls.getCashbackById(this.id), (data, status) => {
            if (status >= 200 && status < 300) {
                this.renderData(data);
                return;
            }

            const loading = this.pageRoot.querySelector(".loading-text");

            if (loading) {
                loading.remove();
            }

            this.showError();
        });
    }

    deleteCashback() {
        const isConfirmed = confirm("Удалить это cashback-предложение?");

        if (!isConfirmed) {
            return;
        }

        ajax.delete(cashbackUrls.removeCashbackById(this.id), (data, status) => {
            if (status === 204) {
                alert("Карточка удалена");
                this.clickBack();
                return;
            }

            alert("Не удалось удалить карточку");
        });
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}
