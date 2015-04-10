//Dependencies.
var builder = require('focus').component.builder;
var React = require('react');


var markdownEditorMixin = {
  getInitialState: function() {
    return {value: this.props.value};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.getDOMNode().value});
  },
  render: function() {
    var converter = window.Showdown ? function(data){ console.warn('showdown should be imported/'); return data; } : new window.Showdown.converter();
    return (
      <div className="MarkdownEditor">
        <textarea
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />

        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(this.state.value)
          }}
        />
      </div>
    );
  }
};


module.exports = builder(markdownEditorMixin);