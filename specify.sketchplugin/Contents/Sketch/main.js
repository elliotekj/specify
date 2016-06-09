// Needed globally
var doc;
var page;
var artboard;
var plugin;
var selection;

// Initialise
function initPlugin(context) {
  doc = context.document;
  page = doc.currentPage();
  artboard = page.currentArtboard();
  plugin = context.plugin;
  selection = context.selection;
}

// Utilities
var utils = {
  "createLabel": function(frame, text) {
    var label = NSTextField.alloc().initWithFrame(frame);
    label.setStringValue(text);
    label.setSelectable(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setDrawsBackground(false);
    return label
  },
  "getLayerProps": function() {
    var layer = selection.firstObject();

    if (layer) {
      var x = layer.frame().x();
      var y = layer.frame().y();
      return [x, y];
    } else {
      return [0, 0];
    }
  }
};

function createRectangleWindow() {
  // Setup the window
  var alert = COSAlertWindow.new();
  alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed("rectangle@2x.png").path()));
  alert.setMessageText("Create a Rectangle")
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Create the main view
  var viewWidth = 300;
  var viewHeight = 140;
  var viewSpacer = 10;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);

  // Create labels
  var widthLabel = utils.createLabel(NSMakeRect(0, viewHeight - 20, (viewWidth / 2) - viewSpacer, 20), "Width:");
  var heightLabel = utils.createLabel(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 20, (viewWidth / 2) - viewSpacer, 20), "Height:");
  var xLabel = utils.createLabel(NSMakeRect(0, viewHeight - 70, (viewWidth / 2) - viewSpacer, 20), "X:");
  var yLabel = utils.createLabel(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 70, (viewWidth / 2) - viewSpacer, 20), "Y:");
  var radiusLabel = utils.createLabel(NSMakeRect(0, viewHeight - 120, (viewWidth / 2) - viewSpacer, 20), "Radius:");
  view.addSubview(widthLabel);
  view.addSubview(heightLabel);
  view.addSubview(xLabel);
  view.addSubview(yLabel);
  view.addSubview(radiusLabel);

  // Create inputs
  widthTextfield = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 40, (viewWidth / 2) - viewSpacer, 20));
  heightTextfield = NSTextField.alloc().initWithFrame(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 40, (viewWidth / 2) - viewSpacer, 20));
  xTextfield = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 90, (viewWidth / 2) - viewSpacer, 20));
  yTextfield = NSTextField.alloc().initWithFrame(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 90, (viewWidth / 2) - viewSpacer, 20));
  radiusTextfield = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 140, viewWidth, 20));
  view.addSubview(widthTextfield);
  view.addSubview(heightTextfield);
  view.addSubview(xTextfield);
  view.addSubview(yTextfield);
  view.addSubview(radiusTextfield);

  // Fill inputs
  var props = utils.getLayerProps();
  widthTextfield.setStringValue('100');
  heightTextfield.setStringValue('100');
  xTextfield.setStringValue(props[0]);
  yTextfield.setStringValue(props[1]);
  radiusTextfield.setStringValue('0');

  return [alert];
}

function createOvalWindow() {
  // Setup the window
  var alert = COSAlertWindow.new();
  alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed("oval@2x.png").path()));
  alert.setMessageText("Create an Oval")
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Create the main view
  var viewWidth = 300;
  var viewHeight = 90;
  var viewSpacer = 10;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);

  // Create labels
  var widthLabel = utils.createLabel(NSMakeRect(0, viewHeight - 20, (viewWidth / 2) - viewSpacer, 20), "Width:");
  var heightLabel = utils.createLabel(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 20, (viewWidth / 2) - viewSpacer, 20), "Height:");
  var xLabel = utils.createLabel(NSMakeRect(0, viewHeight - 70, (viewWidth / 2) - viewSpacer, 20), "X:");
  var yLabel = utils.createLabel(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 70, (viewWidth / 2) - viewSpacer, 20), "Y:");
  view.addSubview(widthLabel);
  view.addSubview(heightLabel);
  view.addSubview(xLabel);
  view.addSubview(yLabel);

  // Create inputs
  widthTextfield = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 40, (viewWidth / 2) - viewSpacer, 20));
  heightTextfield = NSTextField.alloc().initWithFrame(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 40, (viewWidth / 2) - viewSpacer, 20));
  xTextfield = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 90, (viewWidth / 2) - viewSpacer, 20));
  yTextfield = NSTextField.alloc().initWithFrame(NSMakeRect((viewWidth / 2) + viewSpacer, viewHeight - 90, (viewWidth / 2) - viewSpacer, 20));
  view.addSubview(widthTextfield);
  view.addSubview(heightTextfield);
  view.addSubview(xTextfield);
  view.addSubview(yTextfield);

  // Fill inputs
  var props = utils.getLayerProps();
  widthTextfield.setStringValue('100');
  heightTextfield.setStringValue('100');
  xTextfield.setStringValue(props[0]);
  yTextfield.setStringValue(props[1]);

  return [alert];
}
