const MESSAGE_CLASS = ".section.message-body";
const CONTAINER_STYLE =
  "height: 0; padding-bottom: calc(55.21%); position:relative; width: 100%;";
const IMG_STYLE =
  "border:0; height:100%; left:0; overflow:hidden; position:absolute; top:0; width:100%";
const CONTENT_RE = /\.(jpg|jpeg|png|gif)$/i;

const createEmbeddedContentFor = (contentSrc) => {
  const embeddedContainer = document.createElement("div");
  embeddedContainer.style = CONTAINER_STYLE;

  const img = document.createElement("img");
  img.src = contentSrc;
  img.style = IMG_STYLE;
  img.width = "100%";

  embeddedContainer.appendChild(img);

  return embeddedContainer.outerHTML;
};

const messagesInThread = document.querySelectorAll(MESSAGE_CLASS);

// Go through all comments in a thread, embedding image/GIF/video links
messagesInThread.forEach((message) => {
  const words = message.innerHTML.split(" ");

  words.forEach((word, i) => {
    const potentialContentSource = word.trim();
    if (CONTENT_RE.test(potentialContentSource)) {
      const embeddedContent = createEmbeddedContentFor(potentialContentSource);
      words[i] = embeddedContent;
    }
  });

  message.innerHTML = words.join(" ");
});
