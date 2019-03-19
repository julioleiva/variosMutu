export default class ModalSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


        };

        this.method = this.method.bind(this);
    }

    render() {
        const showHideClassName = show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    {children}
                    <button onClick={handClose}>Close</button>
                </section>
            </div>
        )

    }
}