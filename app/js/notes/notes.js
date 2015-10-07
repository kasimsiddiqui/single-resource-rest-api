module.exports = function(app) {
  require('./controllers/notes_controller')(app);
  require('./directives/note_form_directive')(app);
};
