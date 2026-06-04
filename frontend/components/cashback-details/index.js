export class CashbackDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCarouselId(data) {
        return `details-carousel-${data.id}`;
    }

    getPopoverId(data) {
        return `details-popover-${data.id}`;
    }

    getDeleteButtonId(data) {
        return `delete-cashback-${data.id}`;
    }

    getImages(data) {
        if (Array.isArray(data.images) && data.images.length > 0) {
            return data.images;
        }

        if (data.image) {
            return [data.image];
        }

        return [];
    }

    getThreeDHTML(data) {
        if (data.id !== 3) {
            return "";
        }

        return `
            <div class="three-d-zone">
                <div class="coin3d">
                    <div class="coin-face coin-front">₽</div>
                    <div class="coin-face coin-back">%</div>
                    <div class="coin-side"></div>
                </div>
            </div>
            <p class="footer-note text-center">
                3D-объект: вращающаяся cashback-монета, символизирующая возврат части денег.
            </p>
        `;
    }

    getHTML(data) {
        const images = this.getImages(data);

        return `
            <div class="card cashback-details-card">
                <div id="${this.getCarouselId(data)}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="2500">
                                <img src="${img}" class="d-block w-100" alt="${data.title}">
                            </div>
                        `).join("")}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${this.getCarouselId(data)}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${this.getCarouselId(data)}" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>

                <div class="card-body p-4">
                    <div class="cashback-rate mb-3">${data.rate}</div>
                    <h2 class="card-title mb-3">${data.title}</h2>
                    <p class="text-muted">Категория: ${data.category}</p>
                    <p class="card-text fs-5">${data.detailText || data.text}</p>

                    <div class="d-flex gap-2 flex-wrap">
                        <button
                            type="button"
                            class="btn btn-outline-dark mt-2"
                            id="${this.getPopoverId(data)}"
                            data-bs-toggle="popover"
                            data-bs-container="body"
                            data-bs-placement="right"
                            data-bs-title="${data.popoverTitle}"
                            data-bs-content="${data.popoverText}">
                            Информер о предложении
                        </button>

                        <button
                            type="button"
                            class="btn btn-danger mt-2"
                            id="${this.getDeleteButtonId(data)}">
                            Удалить через API
                        </button>
                    </div>

                    ${this.getThreeDHTML(data)}
                </div>
            </div>
        `;
    }

    initPopover(data) {
        const popoverElement = document.getElementById(this.getPopoverId(data));

        new bootstrap.Popover(popoverElement, {
            container: "body",
            trigger: "click"
        });
    }

    addListeners(data, deleteListener) {
        document
            .getElementById(this.getDeleteButtonId(data))
            .addEventListener("click", deleteListener);
    }

    render(data, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.initPopover(data);
        this.addListeners(data, deleteListener);
    }
}
