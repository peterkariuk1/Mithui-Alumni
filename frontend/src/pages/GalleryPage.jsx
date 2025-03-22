import "../styles/Pages.css";
import HomeIcon from "../images/homeicon.png";
import clickIcon from "../images/hover.png";
import RightIcon from "../images/righticon.svg";

import jamesJuma from "../images/jamesjuma.jpg";
import lucyOoko from "../images/lucyouko.jpg";
import mrGerishon from "../images/mrGerishon.jpg";
import georgeBongo from "../images/georgeBongo.jpg";
import lorineNyaoke from "../images/lorineNyaoke.jpg";
import peterOngudu from "../images/maxwellAzeda.jpg";
import maxwellAzeda from "../images/maxwellAzedaRight.jpg";
import nicholasOlela from "../images/nicholasOlela.jpg";
import dolphineOkoth from "../images/dolphineokoth.jpg";

import image1 from "../images/image1.jpg";
import image16 from "../images/image16.jpg";
import image2 from "../images/image2.jpg";
import image14 from "../images/image14.jpg";
import image4 from "../images/image4.jpg";
import image13 from "../images/image13.jpg";
import image5 from "../images/image5.jpg";
import image12 from "../images/image12.jpg";
import image6 from "../images/image6.jpg";
import image11 from "../images/image11.jpg";
import image7 from "../images/image7.jpg";
import image10 from "../images/image10.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";




export function GalleryPage() {
  const galleryItems = [
    {
      image: jamesJuma,
      name: "James Juma",
      title: "First president elect",
      text: "Juma took over the office from David Abong' who was the Interim President overseeing the association activities before formal elections were held.",
    },
    {
      image: lucyOoko,
      name: "Lucy Ooko",
      title: "Vice President of the Association 2022 - 2024",
      text: "Class of 2014",
    },
    {
      image: mrGerishon,
      name: "Mr. Gerishon Obalah Otilah",
      title: "First Principal - Mithui Mixed Secondary School",
      text: "",
    },
    {
      image: georgeBongo,
      name: "George Bongo ",
      title: "Bsc.Mathematics/Business Studies-MACHAKOS UNIVERSITY",
      text: "George, a Data Science student at Open University of Kenya, explores human migration using data-driven solutions, building on his education and research background.",
    },
    {
      image: lorineNyaoke,
      name: "Lorine Nyaoke",
      title: "Current Vice President",
      text: "Class of 2014",
    },
    {
      image: maxwellAzeda,
      name: "Maxwell Azeda",
      title: "Current Organising Secretary",
      text: "Class of 2010",
    },
    {
      image: peterOngudu,
      name: "Peter Ongudu",
      title: "Organising Secretary 2022 - 2024",
      text: "Class of 2008",
    },
    {
      image: nicholasOlela,
      name: "Nicholas Olela",
      title: "Secretary General 2022 to-date",
      text: "Class of 2010",
    },
    {
      image: dolphineOkoth,
      name: "Dolphine Okoth",
      title: "Association Treasurer 2022  to-date",
      text: "Class of 2007",
    },
    // { image: "Image1", title: "President", text: "President" },
  ];
  const randomImages = [
    {
      image: image1,
    },{
      image: image2,
    },{
      image: image4,
    },{
      image: image4,
    },{
      image: image5,
    },{
      image: image6,
    },{
      image: image7,
    },{
      image: image8,
    },{
      image: image9,
    },{
      image: image10,
    },{
      image: image11,
    },{
      image: image12,
    },{
      image: image13,
    },{
      image: image14,
    },{
      image: image16,
    }
  ];
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Capture our every moment.
        </div>
      </section>
      <div className="navigation-section">
        <div>
          <img src={HomeIcon} />
          <p>Home</p>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <p>Gallery</p>
      </div>
      <section className="bottom">
        <h1>Our Leaders at a Glance</h1>
        <div className="gallery-grid">
          {galleryItems.map((item, itemIndex) => {
            return (
              <div className="gallery-item" key={itemIndex}>
                <img className="click-icon" src={clickIcon} />
                <img className="gallery-image" src={item.image} />
                <div className="image-caption">
                  <h1>
                    {item.name}- <span>{item.title}</span>
                  </h1>
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <h1>Moments that Count</h1>
        <div className="random-grid">
          {randomImages.map((randomImage, randomImageIndex) => {
            return (
              <div key={randomImageIndex} className="random-image-container">
                <img src={randomImage.image} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
