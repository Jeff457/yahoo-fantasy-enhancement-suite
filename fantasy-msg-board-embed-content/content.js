const MESSAGE_CLASS = ".section.message-body";
const CONTAINER_STYLE =
  "height: 0; padding-bottom: calc(55.21%); position:relative; width: 100%;";
const IMG_STYLE =
  "border:0; height:100%; left:0; overflow:hidden; position:absolute; top:0; width:100%";
const YOUTUBE_EMBEDDED = "https://www.youtube.com/embed/";
const CONTENT_RE = /\.(jpg|jpeg|png|gif)$/i;
const YOUTUBE_RE = /^.*(youtube\.com\/watch\?v=)([^#\&\?]*).*/;

const embedMediaInContainer = (mediaContainer) => {
  const embeddedContainer = document.createElement("div");
  embeddedContainer.style = CONTAINER_STYLE;
  embeddedContainer.appendChild(mediaContainer);

  return embeddedContainer.outerHTML;
};

const createEmbeddedImg = (contentSrc) => {
  const img = document.createElement("img");
  img.src = contentSrc;
  img.style = IMG_STYLE;
  img.width = "100%";

  return embedMediaInContainer(img);
};

const createEmbeddedYouTubeVideo = (url) => {
  const videoId = url.split("?v=")[1];

  const iFrame = document.createElement("iframe");
  iFrame.src = YOUTUBE_EMBEDDED + videoId;
  iFrame.width = "560";
  iFrame.height = "315";
  iFrame.title = "YouTube video player";
  iFrame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iFrame.setAttribute("allowfullscreen", "");

  return embedMediaInContainer(iFrame);
};

const isImage = (string) => {
  return CONTENT_RE.test(string.split("?")[0]);
};

const isYouTubeVideo = (string) => {
  return YOUTUBE_RE.test(string);
};

const embedContent = () => {
  const messagesInThread = document.querySelectorAll(MESSAGE_CLASS);

  // Go through all comments in a thread, embedding image/GIF/video links
  messagesInThread.forEach((message) => {
    const words = message.innerHTML.split(" ");

    words.forEach((word, i) => {
      const potentialContentSource = word.trim();
      if (isImage(potentialContentSource)) {
        // I could see users leaving in query strings after copying the link address
        words[i] = createEmbeddedImg(potentialContentSource.split("?")[0]);
      } else if (isYouTubeVideo(potentialContentSource)) {
        words[i] = createEmbeddedYouTubeVideo(potentialContentSource);
      }
    });

    message.innerHTML = words.join(" ");
  });
};

chrome.runtime.onMessage.addListener((command, sender, sendResponse) => {
  console.log(`(yes) Running "${command}" command`);
  // currently only one command
  embedContent();
});

embedContent();
