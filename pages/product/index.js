import { BackButtonComponent } from "../../components/back-button/index.js";
import { CashbackDetailsComponent } from "../../components/cashback-details/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const items = {
            1: {
                id: 1,
                title: "Кэшбэк на маркетплейсы",
                text: "Эта карточка посвящена покупкам на маркетплейсах. Пользователь выбирает магазин, активирует кэшбэк и получает возврат части суммы после подтверждения заказа.",
                rate: "до 12%",
                images: [
                    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1400&q=80"
                ],
                popoverTitle: "Подсказка",
                popoverText: "Активируй кэшбэк перед переходом в магазин."
            },
            2: {
                id: 2,
                title: "Кэшбэк на доставку продуктов",
                text: "Кэшбэк на доставку продуктов особенно выгоден для регулярных покупок. Чем чаще пользователь заказывает, тем заметнее экономия.",
                rate: "до 8%",
                images: [
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=1400&q=80"
                ],
                popoverTitle: "Совет",
                popoverText: "Подходит для повседневной экономии."
            },
            3: {
                id: 3,
                title: "Кэшбэк на электронику",
                text: "На покупках техники и электроники cashback особенно заметен. На этой странице есть 3D-объект — вращающаяся монета, символизирующая возврат части денег.",
                rate: "до 15%",
                images: [
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
                ],
                popoverTitle: "3D-объект",
                popoverText: "Ниже показана cashback-монета."
            },
            4: {
                id: 4,
                title: "Кэшбэк на одежду",
                text: "Кэшбэк на одежду и обувь помогает выгоднее покупать в сезон скидок и распродаж.",
                rate: "до 10%",
                images: [
                    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80"
                ],
                popoverTitle: "Плюс",
                popoverText: "Можно совмещать с промокодами магазинов."
            },
            5: {
                id: 5,
                title: "Кэшбэк на путешествия",
                text: "При бронировании отелей и билетов cashback особенно выгоден из-за более высокой суммы заказа.",
                rate: "до 9%",
                images: [
                    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80"
                ],
                popoverTitle: "Путешествуй выгоднее",
                popoverText: "Чем дороже заказ, тем заметнее cashback."
            },
            6: {
                id: 6,
                title: "Кэшбэк на онлайн-курсы",
                text: "Онлайн-обучение с cashback — это способ одновременно инвестировать в знания и экономить.",
                rate: "до 11%",
                images: [
                    "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80",
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                ],
                popoverTitle: "Обучайся с выгодой",
                popoverText: "Подходит для курсов, подписок и платформ с обучением."
            }
        };

        return items[this.id];
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

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const details = new CashbackDetailsComponent(this.pageRoot);
        details.render(data);
    }
}