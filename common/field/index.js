// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;

// Mixins

let valueBehaviour = require('./mixin/value-behaviour');
let validationBehaviour = require('./mixin/validation-behaviour');

// Components

let builtInComponents = require('./mixin/built-in-components');


let FieldMixin = {
    mixins: [valueBehaviour, validationBehaviour, builtInComponents],
    /**
    * Get field default properties.
    */
    getDefaultProps: function getFieldDefaultProps() {
        return {

            /**
            * Edition mode of the field.
            * @type {Boolean}
            */
            isEdit: true,
            /**
            * HTML input type.
            * @type {String}
            */
            type: 'text',
            /**
            * Field name.
            * @type {string}
            */
            name: undefined,
            /**
            * Css properties of the component.
            * @type {Object}
            */
            style: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        isEdit: type('bool'),
        type: type('string'),
        name: type('string'),
        value: type(['string', 'number'])
    },

    /** @inheritdoc */
    componentWillReceiveProps: function fieldWillReceiveProps(newProps){
        this.setState({value: newProps.value, values: newProps.values});
    },
    /**
    * Get the css class of the field component.
    */
    _className: function() {
        let stateClass = this.state.error ? "has-feedback has-error" : "";
        return `form-group ${stateClass} ${this.props.style.className}`;
    },

    render: function renderField() {
        return (
            <div className={this._className()} data-focus='field' data-domain={this.props.domain} data-required={this.props.isRequired} data-mode={this.props.isEdit ? 'edit' : 'consult'}>
                {this.label()}
                {this.props.isEdit ? (this.props.values ? this.select() : this.input()) : this.display()}
                {this.help()}
                {this.error()}
            </div>);
        }
    };
    module.exports = builder(FieldMixin);
