import { CashbackCardComponent } from "../../components/cashback-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                title: "Кэшбэк на маркетплейсы",
                text: "Возвращай часть денег за покупки на крупных маркетплейсах и онлайн-магазинах.",
                rate: "до 12%",
                images: [
                    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1200&q=80"
                ],
                popoverTitle: "Как это работает?",
                popoverText: "Выбираешь магазин, активируешь кэшбэк, покупаешь и получаешь возврат части суммы."
            },
            {
                id: 2,
                title: "Кэшбэк на доставку продуктов",
                text: "Покупай продукты онлайн и возвращай часть потраченных денег на баланс.",
                rate: "до 8%",
                images: [
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=1200&q=80"
                ],
                popoverTitle: "Преимущество",
                popoverText: "Кэшбэк можно совмещать со скидками, промокодами и акциями магазина."
            },
            {
                id: 3,
                title: "Кэшбэк на электронику",
                text: "Получай выгодный возврат за гаджеты, аксессуары и технику для дома.",
                rate: "до 15%",
                images: [
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
                ],
                popoverTitle: "Особенность",
                popoverText: "На этой карточке на странице деталей есть 3D-объект в теме кэшбэка."
            },
            {
                id: 4,
                title: "Кэшбэк на одежду",
                text: "Покупай одежду, обувь и аксессуары с дополнительной выгодой.",
                rate: "до 10%",
                images: [
                    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
                ],
                popoverTitle: "Выгода",
                popoverText: "Особенно удобно использовать кэшбэк во время сезонных распродаж."
            },
            {
                id: 5,
                title: "Кэшбэк на путешествия",
                text: "Получай возврат за бронирование отелей, билетов и туристических услуг.",
                rate: "до 9%",
                images: [
                    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                ],
                popoverTitle: "Подсказка",
                popoverText: "Кэшбэк на путешествия помогает экономить на дорогих заказах."
            },
            {
                id: 6,
                title: "Кэшбэк на онлайн-курсы",
                text: "Оплачивай обучение онлайн и возвращай часть денег за развитие и навыки.",
                rate: "до 11%",
                images: [
                    "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                ],
                popoverTitle: "Польза",
                popoverText: "Так ты не только учишься, но и получаешь возврат части стоимости."
            }
        ];
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
                                одежде и онлайн-курсах. Активируй кэшбэк перед покупкой и возвращай часть денег.
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
                            <div class="info-number">3 шага</div>
                            <div>Выбери магазин, активируй кэшбэк и оформи покупку как обычно.</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mini-info-card">
                            <div class="info-number">до 15%</div>
                            <div>Максимальный процент возврата на популярные категории и товары.</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mini-info-card">
                            <div class="info-number">Реальные деньги</div>
                            <div>Не бонусы, а возврат средств, который можно вывести удобным способом.</div>
                        </div>
                    </div>
                </div>

                <h2 id="offers-section" class="section-title">Популярные cashback-предложения</h2>

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

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const data = this.getData();

        data.forEach((item) => {
            const card = new CashbackCardComponent(this.pageRoot);
            card.render(item, () => this.openCard(item.id));
        });

        this.addHeroButtonListener();
        this.addCardsScrollButtons();
    }
}