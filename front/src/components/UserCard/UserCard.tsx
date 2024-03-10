import { useEffect, useState } from "react";
import "./UserCard.css";
import hljs from "highlight.js";
import '/node_modules/highlight.js/styles/atom-one-dark.css'
type UserCardProps = {
  name: string,
  age: number,
  description: string,
  photos:string[],
  technologies:Technology[],
  code: string,
  theme: string,
}
function PhotoGallery({ photos} : {photos: string[]} ) {
  const [currentPhotoID, setCurrentPhotoID] = useState(0);

  function returnPhotoMapSpans() {
    let resultNodes = [];
    for (let i = 0; i < photos.length; i++) {
      resultNodes.push(
        <div key={i} className={i === currentPhotoID ? "checked" : ""}></div>
      );
    }
    return resultNodes;
  }
  return (
    <div className="photo_gallery">
      <div className="photo_map">
        {returnPhotoMapSpans().map((mapSpan) => {
          return mapSpan;
        })}
      </div>
      <div
        className="photo__map__button photo__map__button--left"
        onClick={() => {
          setCurrentPhotoID((currentPhotoID + photos.length - 1) % photos.length);
          console.log(currentPhotoID);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </div>
      <img src={photos[currentPhotoID]} alt="" />
      <div
        className="photo__map__button photo__map__button--right"
        onClick={() => {
          setCurrentPhotoID((currentPhotoID + photos.length + 1) % photos.length);
          console.log(currentPhotoID);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </div>
    </div>
  );
}

function UserCard({ name, age, description, photos, technologies, code, theme }: UserCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll('pre code')
    nodes.forEach(node => hljs.highlightBlock(node as HTMLElement))
  }, [theme]);

  return (
    <div className="card_block">
      <div className="wrapper">
        <div className={"card " + (isFlipped ? "card--flipped" : "")}>
          <div className="card__top">
            <PhotoGallery photos={photos}></PhotoGallery>
            <h2 className="card__name">
              {name}, <span className="card__age">{age}</span>
            </h2>
          </div>
          <div className="card__bottom">
            <div className="tech__bar">
              {technologies?.map((tech, index) => {
                return (
                  <div
                    key={index}
                    className="tech"
                    style={{ backgroundColor: tech.background_color, color: tech.font_color }}
                  >
                    {tech.name}
                  </div>
                );
              })}
            </div>
            <div className="card_description">{description}</div>
          </div>
        </div>
        <div className={"back " + (isFlipped ? "back--flipped" : "")}>
          <pre className="code_block">
            <code className="code_block">{code}</code>
          </pre>
        </div>
        <div className="fake_card"></div>
        <div className="fake_card"></div>
        <div className="fake_card"></div>
      </div>
      <div className="buttons_block">
        <button className="action_button action_button--like">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </button>
        <button className="action_button action_button--flip" onClick={() => setIsFlipped(!isFlipped)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
          </svg>
        </button>
        <button className="action_button action_button--dis">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
