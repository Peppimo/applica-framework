import {optional} from "../../utils/lang";
"use strict"

export const DIALOG_RESULT_OK = 0
export const DIALOG_RESULT_CANCEL = 1

export class Dialog extends React.Component {

    constructor(props) {
        super(props)

        this.opened = false
        this.dialogResult = DIALOG_RESULT_CANCEL
    }

    componentDidMount() {
        let me = ReactDOM.findDOMNode(this)
        $(me)
            .modal({show: false})
            .on("shown.bs.modal", () => this.opened = true)
            .on("hidden.bs.modal", () => {
                this.opened = false
                if (_.isFunction(this.props.onClose)) {
                    this.props.onClose(this.dialogResult)
                }
            })
    }

    componentDidUpdate() {
        if (!this.props.hidden && !this.opened) {
            this.show()
        } else if (this.props.hidden && this.opened) {
            this.hide()
        }
    }

    show() {
        let me = ReactDOM.findDOMNode(this)
        $(me).modal("show")
    }

    hide() {
        let me = ReactDOM.findDOMNode(this)
        $(me).modal("hide")
    }

    runButtonAction(button) {
        this.dialogResult = optional(button.dialogResult, DIALOG_RESULT_CANCEL)
        button.action(this)
    }

    render() {
        let buttons = optional(this.props.buttons, []).map(b => <button key={b.text} type="button" className="btn btn-link waves-effect" onClick={this.runButtonAction.bind(this, b)}>{b.text}</button>)
        let style = {
            //display: this.props.hidden ? "none" : "block"
        }

        let bodyStyle = {
            padding: this.props.noPadding ? "0px" : undefined
        }

        return (
            <div className="modal fade" role="dialog" tabIndex="-1" style={style}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body" style={bodyStyle}>
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}