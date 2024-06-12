const left = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 26 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="6.5"
      width="15"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="12.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="18.5"
      width="15"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="0.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
  </svg>
)

const center = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 26 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5.5"
      y="6.5"
      width="15"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="12.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="5.5"
      y="18.5"
      width="15"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="0.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
  </svg>
)

const right = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 26 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="10.5"
      y="6.5"
      width="15"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="12.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="10.5"
      y="18.5"
      width="15"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="0.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
  </svg>
)

const strech = (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 26 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="6.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="12.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="18.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
    <rect
      x="0.5"
      y="0.5"
      width="25"
      height="3"
      rx="1.5"
      fill="#070425"
      stroke="black"
    />
  </svg>
)


function AlignAnimation({ type }: { type: string }) {
  let html
  switch (type) {
    case 'left':
      html = left
      break;
    case 'center':
      html = center
      break;
    case 'right':
      html = right
      break;
    case 'strech':
      html = strech
      break;
    default:
      console.log('error in AlignAnimation.tsx')
      break;
  }
  return <>{html}</>
}

export default AlignAnimation;
