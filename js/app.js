import { cdnUrl, projectID } from "./env.js";
import { handleImage, handleParagraphs } from "./utils.js";

function init() {
  const urlString = window.location.search;
  const paramsUrl = new URLSearchParams(urlString);
  const pageValue = paramsUrl.get("page");

  console.log(pageValue);
  const burgerIcon = document.querySelector(".burger-icon");
  const mobileNav = document.querySelector(".mobile-nav");
  burgerIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-hide");
    burgerIcon.classList.toggle("burger");
    burgerIcon.classList.toggle("closemobilemenu");
  });

  if (pageValue === null) {
    getPosts();
  } else {
    getPost(pageValue);
  }
}
// const cdnUrl = "https://cdn.sanity.io/images/m6fteynd/production/";

async function getPost(pageValue) {
  const project = document.querySelector(".project");
  const post =
    await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*%20%5B_type%20%3D%3D%20%22post%22%5D
  [slug.current == "${pageValue}"]
  `);
  const { result } = await post.json();

  const maintitle = document.createElement("h1");
  maintitle.innerText = result[0].maintitle;
  project.append(maintitle);

  project.append(handleImage(result[0].mainImage.asset._ref));

  // const imgCover = result[0].mainImage.asset._ref.split("-");
  // const cover = document.createElement("img");
  // cover.setAttribute(
  //   "src",
  //   `${cdnUrl}${imgCover[1]}-${imgCover[2]}.${imgCover[3]}`
  // );
  // project.append(cover);

  const divider = document.createElement("h2");
  divider.innerText = "OM PROJEKTET";
  divider.classList.add("divider");
  project.append(divider);

  const projectSection = document.createElement("div");
  projectSection.classList.add("projectsection");
  project.append(projectSection);

  const projectInfo = document.createElement("div");
  projectInfo.classList.add("projectinfo");
  projectInfo.append(handleParagraphs(result[0].intro, "projectIntroText"));
  projectSection.append(projectInfo);

  const projectDetails = document.createElement("div");
  projectDetails.classList.add("projectdetails");
  projectSection.append(projectDetails);

  const toolsContainer = document.createElement("div");
  toolsContainer.classList.add("tools-containter");

  const when = document.createElement("p");
  when.innerText = "När: " + result[0].when;
  when.classList.add("bold");
  projectDetails.append(when);

  const goal = document.createElement("p");
  goal.innerText = "Mål: " + result[0].goal;
  goal.classList.add("bold");
  projectDetails.append(goal);

  const scope = document.createElement("p");
  scope.innerText = "Omfång: " + result[0].scope;
  scope.classList.add("bold");
  projectDetails.append(scope);

  const team = document.createElement("p");
  team.innerText = "Team: " + result[0].team;
  team.classList.add("bold");
  projectDetails.append(team);

  projectDetails.append(toolsContainer);
  const tools = document.createElement("span");
  tools.innerText = "Verktyg: ";
  toolsContainer.append(tools);

  // her loop vi gjennom tools array
  result[0].tools.forEach((tool) => {
    const toolImg = document.createElement("img");
    toolImg.setAttribute("src", `/assets/${tool}.svg`);
    toolsContainer.append(toolImg);
  });

  project.append(handleParagraphs(result[0].research, "bodytext"));

  const researchImageContainer = document.createElement("div");
  researchImageContainer.classList.add("researchimage-containter");

  project.append(researchImageContainer);

  result[0].imageResearch.forEach((statistic) => {
    researchImageContainer.append(handleImage(statistic.asset._ref));
  });

  project.append(handleParagraphs(result[0].konklusjon, "bodytext"));
  project.append(handleParagraphs(result[0].behovanalyse, "bodytext"));

  const personasContainer = document.createElement("div");
  personasContainer.classList.add("personas-containter");

  result[0].personasImg.forEach((persona) => {
    personasContainer.append(handleImage(persona.asset._ref));
  });
  project.append(personasContainer);
  project.append(handleParagraphs(result[0].koncept, "bodytext"));

  const lofiContainer = document.createElement("div");
  lofiContainer.classList.add("lofi-containter");

  result[0].lofiImg.forEach((lofi) => {
    lofiContainer.append(handleImage(lofi.asset._ref));
  });
  project.append(lofiContainer);

  project.append(handleParagraphs(result[0].body, "bodytext"));

  // const body = document.createElement("p");
  // body.innerText = result[0].body;
  // project.append(body);
}

// getPosts();

async function getPosts() {
  const posts =
    await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*%20%5B_type%20%3D%3D%20%22post%22%5D
  [_type == "post"]
  `);
  const { result } = await posts.json();

  const workList = document.querySelector(".cards");

  result.forEach((post) => {
    const cover = post.mainImage.asset._ref.split("-");
    let logo = [];
    if (post.logoImage.asset._ref !== undefined) {
      logo = post.logoImage.asset._ref.split("-");
    }

    const workBlock = document.createElement("a");
    workBlock.classList.add("card");
    workBlock.setAttribute("id", post.classname);
    workBlock.setAttribute("href", `./work.html?page=${post.slug.current}`);
    const workTitle = document.createElement("h2");
    workTitle.classList.add("work-title");
    workTitle.innerText = post.title;
    workBlock.append(workTitle);
    const card = document.createElement("div");
    workBlock.append(card);
    const workCover = document.createElement("img");
    if (logo.length > 0) {
      workCover.setAttribute(
        "src",
        `${cdnUrl}${logo[1]}-${logo[2]}.${logo[3]}`
      );
    }

    workCover.classList.add("projectlogo");
    workBlock.append(workCover);

    workBlock.append(handleImage(post.mainImage.asset._ref, "projectimage"));
    workList.append(workBlock);
  });

  console.log(result);
}

init();
