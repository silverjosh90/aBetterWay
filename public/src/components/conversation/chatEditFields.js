var ChatEditFields  = React.createClass({
  render: function() {
    return (
      <div className="questionInput">
      <textarea name={this.props.name} ref={this.props.name} placeholder={this.props.placeholder} value={this.props.value}
      className="classText" onChange={this.props.onChange}> </textarea>
      <div className="input"> {this.props.error}</div>
      </div>
    )
  }
})

module.exports= ChatEditFields
