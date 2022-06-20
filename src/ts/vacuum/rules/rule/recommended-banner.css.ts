import { css } from 'lit';

export default css`
  .banner {
    border: 1px solid var(--secondary-color-lowalpha);
    position: absolute;
    top: -20px;
    right: 10px;
    z-index: -1;
    width: 160px;
    height: 20px;
    line-height: 1.9rem;
    text-align: center;
    background: linear-gradient(
            180deg,
            var(--secondary-color-shadow) 0%,
            var(--secondary-color-shadow-mid) 10%,
            var(--secondary-color-very-lowalpha) 50%
    );
    transition-timing-function: ease-out;
    transition: top 500ms, height 5ms;
  }
  
  .show {
    top: 3px;
    height: 30px;
  }

  @media only screen and (max-width: 600px) {
    .banner {
      display:none;
      overflow-y: hidden;
      opacity: 0;
      height: 12px;
      z-index:3;
      right: 0;
      line-height: 0.85rem;
      margin-top: 0px;
      transition-timing-function: ease-out;
      transition: opacity 500ms;
      font-size: 0.7rem;
      width: 90px;
    }

    .show {
      opacity: 1;
    }
  
  
`;
