var ProfileEditFields  = React.createClass({
  render: function() {
    return (
      <div>
      <label htmlFor={this.props.name}> {this.props.placeholder} </label>
      <input type="text" name={this.props.name} ref={this.props.name} placeholder={this.props.placeholder} value={this.props.value}
      className="form-control" onChange={this.props.onChange} />
      <div className="input"> {this.props.error}</div>
      </div>
    )
  }
})

module.exports= ProfileEditFields
