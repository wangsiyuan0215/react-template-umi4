class Welcome {
    private container: Element = null;

    private $root: Element = null;

    constructor() {
        this.$root = document.createElement('div');
        this.init();
    }

    init() {
        this.$root.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100vw;
                height: 100vh;
                font-family: 'Nunito Sans', 'Noto Sans TC', sans-serif;
                font-size: 20px;
            ">
                <h1 style="
                    margin-top: -50px;
                    margin-bottom: 15px;
                    font-size: 60px;
                    font-weight: bolder;
                    animation: antFadeIn 3s ease infinite alternate;
                    -webkit-animation: antFadeIn 3s ease infinite alternate;
                ">
                    Welcome 🎉
                </h1>
                <p style="color: #444;">Please stand by, While we are verifying your information...</p>
            </div>
        `;
    }

    render(container: Element) {
        this.container = container;
        this.container.appendChild(this.$root);
    }

    unmount() {
        this.container.removeChild(this.$root);
    }
}

export default new Welcome();
