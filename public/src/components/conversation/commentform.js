
var CommentForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value})
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim()

    if(!text) {
      return;
    }
    this.props.onCommentSubmit({text: text});
    this.setState({text: ''})
  },
  render: function() {
    return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
          <input type="submit" className="commenter" value="Post" />
        </form>
    );
  }
});

module.exports= CommentForm
