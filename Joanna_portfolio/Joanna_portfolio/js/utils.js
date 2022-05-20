import { cdnUrl } from "./env.js";
// istedenfor å håndtere hver gang vi trenger et bilde med split
// lager vi en stætte funksjon som returnere bildet ferdig behandlet

export function handleImage(keyImage, customClass = "basic-image") {
  // vi trenger fast url av cdn + verdi i index 1, 2 og 3
  /*['image', 'dsefs45tfsrgfg5ge', '1200x800', 'jpg'] eksempel av cover
   */
  const imageArray = keyImage.split("-");
  const image = document.createElement("img");
  image.classList.add(customClass);
  image.setAttribute(
    "src",
    `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`
  );
  return image;
}

// vi trenger en støtte funksjon som håndtere objekt av block element

export function handleParagraphs(body, className) {
  const text = document.createElement("article");
  text.classList.add(className);
  if (body) {
    body.map((p) => {
      if (p._type === "block") {
        const newp = document.createElement("section");
        newp.innerText = p.children[0].text;

        switch (p.style) {
          case "h3":
            newp.classList.add("h3");
          case "h4":
            newp.classList.add("h4");
          case "Strong":
            newp.classList.add("bold-text");
          case "normal":
            newp.classList.add("bodyparagraph");
        }

        text.append(newp);
      }
      if (p._type === "image") {
        text.append(handleImage(p.asset._ref, "project-images"));
      }
    });
  }

  return text;
}
