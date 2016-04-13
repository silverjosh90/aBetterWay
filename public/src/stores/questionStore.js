var Question = {

  getRandomQuestion: function() {
    questionBank= [
      'Would you rather have a head the size of a tennis ball or the size of a watermelon?',
      'Would you rather peel all your nails out of your fingers or pull all the teeth out of your mouth?',
      'Would you rather use eye drops made of vinegar or toilet paper made from sandpaper?',
      'Would you rather have a large 10 inch long belly button that swayed to music or have accordions for legs?',
      'Would you rather have a dragon or be a dragon?',
      'Would you rather wear a snow suit in the desert or be naked in Antarctica?',
      'if nothing sticks to teflon what makes th teflon stick to the pan?',
      'Why doesn\'t Tarzan have a beard?',
      'Do infants enjoy infancy as much as adults enjoy adultery?',
      'Why did Yankee Doodle name the feather in his hat macaroni?',
      'Would you rather never have access to the internet or Nicholas Cage alway be within 3 feet of you?'
    ]
    var random = Math.floor(Math.random() * 10)
    return questionBank[questionBank.length-1]
  }




}

module.exports= Question
