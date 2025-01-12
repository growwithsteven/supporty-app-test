export async function GET(req) {
  const projectUuid = req.nextUrl.searchParams.get("p");
  const isAnimated = req.nextUrl.searchParams.get("anim") === "true";
  const isTest = req.nextUrl.searchParams.get("test") === "true";

  const baseUrl = isTest ? "http://localhost:3000" : "https://supporty.app";
  const chatUrl = `${baseUrl}/chat/${projectUuid}`;

  return new Response(
    `;(function () {
  if (typeof window === 'undefined') return; // 클라이언트 환경 체크

  var openSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28px; height: auto;"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" fill="white" /></svg>'
  var closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="width: 24px; height: auto;"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="#505050"/></svg>'

  var chatButton = document.createElement('button')
  chatButton.innerHTML = openSvg
  chatButton.style.cssText = \`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9998;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: ${isAnimated ? "transform 0.1s ease, background-color 0.2s ease" : "none"};
  \`

  var chatIframe = document.createElement('iframe')
  chatIframe.src = '${chatUrl}'
  chatIframe.style.cssText = \`
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 350px;
    height: 500px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    opacity: 0;
    transition: ${isAnimated ? "bottom 0.2s ease, opacity 0.2s ease" : "none"};
    display: none;
  \`

  function render() {
    // 이미 추가되었으면 추가하지 않음
    if (chatButton.parentNode || chatIframe.parentNode) return;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatIframe);

    if (${isAnimated}) {
      chatButton.addEventListener('mousedown', function () {
        chatButton.style.transform = 'scale(0.9)';
      })
      chatButton.addEventListener('mouseup', function () {
        chatButton.style.transform = 'scale(1)';
      })
      chatButton.addEventListener('mouseleave', function () {
        chatButton.style.transform = 'scale(1)';
      })
    }

    function getPlatform() {
      const ua = navigator.userAgent.toLowerCase();

      if (/iphone/.test(ua)) {
        return 'iphone';
      } else if (/ipad/.test(ua)) {
        return 'ipad';
      } else if (/android/.test(ua)) {
        return 'android';
      } else if (/macintosh|mac os x/.test(ua)) {
        return 'mac';
      } else if (/windows/.test(ua)) {
        return "windows";
      } else {
        return null;
      }
    }
    function getBrowser() {
      const ua = navigator.userAgent;
      
      if (ua.indexOf("Edg") !== -1 || ua.indexOf("Edge") !== -1) {
        return "Edge";
      } else if (ua.indexOf("Chrome") !== -1 && ua.indexOf("Safari") !== -1) {
        // Chrome은 Safari 문자열을 포함하므로 Chrome 탐지 후 Safari 조건은 따로 체크
        return "Chrome";
      } else if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) {
        return "Safari";
      } else if (ua.indexOf("Firefox") !== -1) {
        return "Firefox";
      } else if (ua.indexOf("MSIE") !== -1 || ua.indexOf("Trident") !== -1) {
        // IE 11 이하일 경우
        return "IE";
      } else {
        return "Unknown";
      }
    }

    chatButton.addEventListener('click', function () {
      if (chatIframe.style.display === 'none') {
        // open

        chatIframe.style.display = 'block'
        setTimeout(() => {
          chatIframe.style.bottom = '90px'
          chatIframe.style.opacity = '1'
        }, 10)

        chatButton.innerHTML = closeSvg
        chatButton.style.backgroundColor = '#ffffff'

        // send access info
        var title = document.title;
        var href = window.location.href;
        var platform = getPlatform();
        var browser = getBrowser();
        var referrer = document.referrer;

        chatIframe.contentWindow.postMessage({type:'ACCESS_INFO', title, href, platform, browser, referrer}, '*');
      } else {
        // close

        chatIframe.style.bottom = '80px'
        chatIframe.style.opacity = '0'
        setTimeout(() => {
          chatIframe.style.display = 'none'
        }, 200)

        chatButton.innerHTML = openSvg
        chatButton.style.backgroundColor = '#007bff'
      }
    })
  }

  // DOM 준비가 필요 없다면 바로 append
  render();
})()`,
    {
      headers: {
        "Content-Type": "application/javascript",
      },
    },
  );
}
