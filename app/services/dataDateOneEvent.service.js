export default {
  async choiceDateOneEvent(data) {
    const uniqueDateChoice = new Set();
    const userChoice = [];
    const numberVote = [];
    const idOfUserChoice = [];

    Object.keys(data.users).forEach((userKey) => {
      const userChoiceData = data.users[userKey].user_choices;
      for (let i = 0; i < userChoiceData.length; i += 1) {
        const startDateChoice = userChoiceData[i].start_date_choice;
        const endDateChoice = userChoiceData[i].end_date_choice;
        const datePair = `${startDateChoice} - ${endDateChoice}`;

        if (!uniqueDateChoice.has(datePair)) {
          uniqueDateChoice.add(datePair);
          userChoice.push({
            start_date_choice: startDateChoice,
            end_date_choice: endDateChoice,
          });
          numberVote.push(1);
          idOfUserChoice.push([userChoiceData[i].user_id]);
        } else {
          const existingIndex = Array.from(uniqueDateChoice).indexOf(datePair);
          numberVote[existingIndex] += 1;
          if (!idOfUserChoice[existingIndex]) {
            idOfUserChoice[existingIndex] = [];
          }
          idOfUserChoice[existingIndex].push(userChoiceData[i].user_id);
        }
      }
    });

    const usershasChoices = [];
    for (let i = 0; i < idOfUserChoice.length; i += 1) {
      const userhasChoice = [];
      for (let j = 0; j < idOfUserChoice[i].length; j += 1) {
        const currentUser = data.users;
        const user = currentUser.find((element) => element.user_id === idOfUserChoice[i][j]);
        if (user) {
          userhasChoice.push({
            name: `${user.user_information.user_firstname} ${user.user_information.user_lastname}`,
          });
        }
      }
      usershasChoices.push(userhasChoice);
    }

    const result = {
      userChoice,
      numberVote,
      usershasChoices,
    };

    return result;
  },
};
