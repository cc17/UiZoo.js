import {Component} from 'react';
import './index.scss';

const OPEN_STATE_CLASS = 'bibliotheca-collapsible-open';

/**
 * @name
 * Collapsible
 * 
 * @module
 * Content
 *
 * @description
 * An element that can be closed or opened by clicking on the title
 *
 * @example
 * // Example with some style minimalism
 * <Collapsible
 *      title="Click me to open/close the content"
 *      style={{border: "1px solid", padding: "15px"}}
 *      contentStyle={{paddingTop: "15px"}}>
 *      This is the content
 * </Collapsible>
 *
 * @param {node} title clickable string/element to open/close the content
 * @param {node} children inner content of the Collapsible
 * @param {boolean} [isOpen=true] to control the Collapsible from the outside by passing a boolean value
 * @param {function} [onChange] callback for change of the content state
 * @param {object} [style] outer style of the element
 * @param {object} [titleStyle] the style of the title only
 * @param {object} [contentStyle] the title of the content only
 */
export default class Collapsible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen || true
        };

        this.toggleOpenState = this.toggleOpenState.bind(this);
    }

    /**
     * Checks if the isOpen props has changed from the last value and update the state accordingly
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen !== this.state.isOpen) {
            this.toggleOpenState();
        }
    }

    /**
     * Change content container max-height style value for cool animation
     * @param {boolean} isOpen
     */
    updateContentMaxHeight(isOpen) {
        let newMaxHeight = isOpen ? this.contentRef.clientHeight + 500 : 0;
        this.contentContainerRef.style.maxHeight = newMaxHeight;
    }

    /**
     *  Open/Close the element
     */
    toggleOpenState() {
        this.setState(currentState => {
            currentState.isOpen = !currentState.isOpen;
            this.updateContentMaxHeight(currentState.isOpen);
            this.props.onChange && this.props.onChange(currentState.isOpen);
            return currentState;
        });
    }

    /**
     * Render function
     */
    render() {
        const addedClassName = this.state.isOpen ? OPEN_STATE_CLASS : '';

        return (
            <div
                className={`bibliotheca-collapsible-container ${addedClassName}`}
                style={this.props.style}>
                <button
                    tabIndex="1"
                    className="bibliotheca-collapsible-title"
                    onClick={this.toggleOpenState}
                    style={this.props.titleStyle}>
                    {this.props.title}
                </button>
                <div
                    className="bibliotheca-collapsible-content-container"
                    ref={contentContainerRef => this.contentContainerRef = contentContainerRef}>
                    <div
                        className="bibliotheca-collapsible-content"
                        ref={contentRef => this.contentRef = contentRef}
                        style={this.props.contentStyle}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}