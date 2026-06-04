import { CashbackCardComponent } from "../../components/cashback-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { cashbackUrls } from "../../modules/cashbackUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentTitle = "";
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div class="hero-section">
                <div class="container">
                    <div class="row align-items-center g-4">
                        <div class="col-lg-6">
                            <h1 class="hero-title">
                                Сервис, который даёт <span class="hero-highlight">кэшбэк</span>
                            </h1>
                            <p class="hero-text">
                                Экономь на маркетплейсах, доставке продуктов, электронике, путешествиях,
                                одежде и онлайн-курсах. Карточки ниже загружаются с backend API через fetch и Promise.
                            </p>
                            <button id="start-saving-btn" class="btn btn-dark btn-lg" type="button">
                                Начать экономить
                            </button>
                        </div>
                        <div class="col-lg-6">
                            <div id="topHeroCarousel" class="carousel slide hero-slider" data-bs-ride="carousel">
                                <div class="carousel-inner rounded-4">
                                    <div class="carousel-item active" data-bs-interval="2500">
                                        <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80" class="d-block w-100" alt="cashback">
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2500">
                                        <img src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1400&q=80" class="d-block w-100" alt="shopping">
                                    </div>
                                    <div class="carousel-item" data-bs-interval="2500">
                                        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80" class="d-block w-100" alt="discounts">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container py-5">
                <div class="row g-3 mb-5">
                    <div class="col-md-4">
                        <div class="mini-info-card">
                            <div class="info-number">fetch</div>
                            <div>Данные карточек приходят с backend по адресу <b>/cashbacks</b> через fetch.</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mini-info-card">
                            <div class="info-number">GET</div>
                            <div>Главная страница получает список cashback-предложений через API.</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mini-info-card">
                            <div class="info-number">DELETE</div>
                            <div>На странице карточки можно удалить предложение через API.</div>
                        </div>
                    </div>
                </div>

                <h2 id="offers-section" class="section-title">Популярные cashback-предложения</h2>

                <div class="filter-card mb-4">
                    <label for="title-filter" class="form-label fw-bold">Фильтр по названию</label>
                    <div class="d-flex gap-2 flex-wrap">
                        <input
                            id="title-filter"
                            class="form-control"
                            style="max-width: 420px;"
                            type="text"
                            placeholder="Например: электронику, одежду, путешествия">
                        <button id="filter-button" class="btn btn-dark" type="button">Найти</button>
                        <button id="reset-filter-button" class="btn btn-outline-secondary" type="button">Сбросить</button>
                    </div>
                    <div class="form-text">
                        Запрос отправляется как GET /cashbacks?title=...
                    </div>
                </div>

                <div class="position-relative">
                    <button
                        id="cards-prev"
                        class="btn btn-outline-dark cards-nav-btn cards-nav-btn-left"
                        type="button">
                        ←
                    </button>

                    <div id="main-page" class="cards-scroll-container d-flex gap-4 overflow-auto pb-3"></div>

                    <button
                        id="cards-next"
                        class="btn btn-outline-dark cards-nav-btn cards-nav-btn-right"
                        type="button">
                        →
                    </button>
                </div>
            </div>
        `;
    }

    addHeroButtonListener() {
        const button = document.getElementById("start-saving-btn");
        const offersSection = document.getElementById("offers-section");

        if (button && offersSection) {
            button.addEventListener("click", () => {
                offersSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        }
    }

    addFilterListeners() {
        const input = document.getElementById("title-filter");
        const filterButton = document.getElementById("filter-button");
        const resetButton = document.getElementById("reset-filter-button");

        if (!input || !filterButton || !resetButton) {
            return;
        }

        filterButton.addEventListener("click", () => {
            this.currentTitle = input.value;
            this.getData();
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.currentTitle = input.value;
                this.getData();
            }
        });

        resetButton.addEventListener("click", () => {
            input.value = "";
            this.currentTitle = "";
            this.getData();
        });
    }

    addCardsScrollButtons() {
        const container = document.getElementById("main-page");
        const prevBtn = document.getElementById("cards-prev");
        const nextBtn = document.getElementById("cards-next");

        if (!container || !prevBtn || !nextBtn) {
            return;
        }

        prevBtn.addEventListener("click", () => {
            container.scrollBy({
                left: -380,
                behavior: "smooth"
            });
        });

        nextBtn.addEventListener("click", () => {
            container.scrollBy({
                left: 380,
                behavior: "smooth"
            });
        });
    }

    openCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    showLoading() {
        this.pageRoot.innerHTML = `<div class="loading-text">Загрузка cashback-предложений...</div>`;
    }

    showError() {
        this.pageRoot.innerHTML = `
            <div class="error-text text-danger">
                Не удалось загрузить данные. Проверь, что backend запущен на http://localhost:3000.
            </div>
        `;
    }

    renderData(items) {
        this.pageRoot.innerHTML = "";

        if (!items || items.length === 0) {
            this.pageRoot.innerHTML = `<div class="empty-text">Карточки не найдены.</div>`;
            return;
        }

        items.forEach((item) => {
            const card = new CashbackCardComponent(this.pageRoot);
            card.render(item, () => this.openCard(item.id));
        });
    }

    getData() {
        this.showLoading();

        ajax.get(cashbackUrls.getCashbacks(this.currentTitle), (data, status) => {
            if (status >= 200 && status < 300) {
                this.renderData(data);
                return;
            }

            this.showError();
        });
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        this.addHeroButtonListener();
        this.addFilterListeners();
        this.addCardsScrollButtons();
        this.getData();
    }
}
