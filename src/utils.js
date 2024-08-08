const getAllTests = () => {
  const context = require.context("./quizzes", true, /.json$/);
  const all = {};
  context.keys().forEach((key) => {
    const fileName = key.replace("./", "");
    const resource = require(`./quizzes/${fileName}`);
    const namespace = fileName.replace(".json", "");
    all[namespace] = JSON.parse(JSON.stringify(resource));
  });
  return all;
};

export const getAllQuestions = (isShuffled = false) => {
  const all = getAllTests();
  var keys = Object.keys(all);
  const questions = [];

  for (var i = 0; i < keys.length; i++) {
    var val = all[keys[i]];
    questions.push(...val.results);
  }
  if (isShuffled) {
    return questions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  return questions;
};
