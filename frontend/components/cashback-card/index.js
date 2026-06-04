export class CashbackCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCarouselId(data) {
        return `cashback-carousel-${data.id}`;
    }

    getPopoverId(data) {
        return `popover-card-${data.id}`;
    }

    getOpenId(data) {
        return `open-card-${data.id}`;
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

    getHTML(data) {
        const images = this.getImages(data);

        return `
            <div class="cashback-scroll-card flex-shrink-0">
                <div class="card cashback-card h-100">
                    <div id="${this.getCarouselId(data)}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${images.map((img, index) => `
                                <div class="carousel-item ${index === 0 ? "active" : ""}" data-bs-interval="2200">
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

                    <div class="card-body d-flex flex-column">
                        <div class="cashback-rate">${data.rate}</div>
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <p class="text-muted mb-3">Категория: ${data.category}</p>

                        <div class="mt-auto d-flex gap-2 flex-wrap">
                            <button class="btn btn-dark" id="${this.getOpenId(data)}" type="button">
                                Открыть
                            </button>

                            <button
                                class="btn btn-outline-secondary"
                                type="button"
                                id="${this.getPopoverId(data)}"
                                data-bs-toggle="popover"
                                data-bs-container="body"
                                data-bs-placement="top"
                                data-bs-title="${data.popoverTitle}"
                                data-bs-content="${data.popoverText}">
                                Информер
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener) {
        document
            .getElementById(this.getOpenId(data))
            .addEventListener("click", openListener);
    }

    initPopover(data) {
        const popoverElement = document.getElementById(this.getPopoverId(data));

        new bootstrap.Popover(popoverElement, {
            container: "body",
            trigger: "click"
        });
    }

    render(data, openListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, openListener);
        this.initPopover(data);
    }
}
