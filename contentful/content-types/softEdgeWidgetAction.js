module.exports = function(migration) {
  const softEdgeWidgetAction = migration
    .createContentType('softEdgeWidgetAction')
    .name('SoftEdgeWidgetAction')
    .description(
      'Actions made via our third party partner, SoftEdge. This can be an email, Tweet, Facebook post, call, etc. to specific targets. ',
    )
    .displayField('internalTitle');

  softEdgeWidgetAction
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 65,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction
    .createField('softEdgeId')
    .name('SoftEdge ID')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction
    .createField('actionId')
    .name('Action Id')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      },
    ])
    .disabled(false)
    .omitted(false);

  softEdgeWidgetAction.changeEditorInterface('internalTitle', 'singleLine', {
    helpText:
      'This is for our internal Contentful organization and will be how the block shows up in search results, etc. It should include the Year-Month and a distinctive title to help find this content in the system.',
  });

  softEdgeWidgetAction.changeEditorInterface('title', 'singleLine', {
    helpText:
      'This will be displayed as the header within the SoftEdge widget action block.',
  });

  softEdgeWidgetAction.changeEditorInterface('softEdgeId', 'numberEditor', {
    helpText:
      'The ID of the SoftEdge action, given upon creation in SoftEdge. When you click "Publish Now", a URL will appear in the "See the Action" box. The SoftEdge ID is the last digit in the URL. e.g. SoftEdge ID = 3 in http://www.congressweb.com/dosomething/3',
  });

  softEdgeWidgetAction.changeEditorInterface('actionId', 'numberEditor', {
    helpText: 'The Action ID associated with this action in Rogue.',
  });
};
