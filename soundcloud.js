var iframeElement   = document.querySelector('iframe');
var iframeElementID = iframeElement.id;
var widget1         = SC.Widget(iframeElement);
var widget2         = SC.Widget(iframeElementID);

SC.load("https://soundcloud.com/chrisbjerken/picking-up-the-pieces");
