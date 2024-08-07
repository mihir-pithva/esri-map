// import BasemapGallery from "esri/widgets/BasemapGallery";

// export const setupBasemapGallery = (view) => {
//   const basemapGalleryContainer = document.createElement("div");
//   basemapGalleryContainer.className = "basemap-gallery-container";
//   basemapGalleryContainer.style.position = "absolute";
//   basemapGalleryContainer.style.top = "40px";
//   basemapGalleryContainer.style.right = "10px";
//   basemapGalleryContainer.style.width = "auto";
//   basemapGalleryContainer.style.height = "auto";
//   basemapGalleryContainer.style.display = "none";
//   basemapGalleryContainer.style.zIndex = "100";

//   const basemapGallery = new BasemapGallery({
//     view: view,
//     container: basemapGalleryContainer,
//   });

//   const galleryTrigger = document.createElement("div");
//   galleryTrigger.className = "basemap-gallery-trigger";
//   galleryTrigger.style.width = "100px";
//   galleryTrigger.style.background = "rgba(255, 255, 255, 0.8)";
//   galleryTrigger.style.position = "absolute";
//   galleryTrigger.style.top = "10px";
//   galleryTrigger.style.right = "10px";
//   galleryTrigger.style.cursor = "pointer";
//   galleryTrigger.style.zIndex = "101";
//   galleryTrigger.style.padding = "5px";
//   galleryTrigger.style.borderRadius = "4px";
//   galleryTrigger.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";

//   galleryTrigger.textContent = "Select Basemap";

//   galleryTrigger.addEventListener("click", () => {
//     const isVisible = basemapGalleryContainer.style.display === "block";
//     basemapGalleryContainer.style.display = isVisible ? "none" : "block";
//   });

//   document.addEventListener("click", (event) => {
//     if (
//       !galleryTrigger.contains(event.target) &&
//       !basemapGalleryContainer.contains(event.target)
//     ) {
//       basemapGalleryContainer.style.display = "none";
//     }
//   });

//   basemapGallery.on("selection-change", () => {
//     const selectedBasemap = basemapGallery.selectedBasemap;
//     galleryTrigger.textContent = selectedBasemap.title || "Select Basemap";
//     galleryTrigger.style.background =
//       selectedBasemap.baseMapLayerIds.length > 0
//         ? selectedBasemap.baseMapLayerIds[0].color
//         : "rgba(255, 255, 255, 0.8)";
//     basemapGalleryContainer.style.display = "none";
//   });

//   view.ui.add(galleryTrigger, "top-right");
//   view.ui.add(basemapGalleryContainer, "top-right");
// };

import BasemapGallery from "esri/widgets/BasemapGallery";

export const setupBasemapGallery = (view) => {
  const basemapGalleryContainer = document.createElement("div");
  basemapGalleryContainer.className = "basemap-gallery-container";

  const basemapGallery = new BasemapGallery({
    view: view,
    container: basemapGalleryContainer,
  });

  const galleryTrigger = document.createElement("div");
  galleryTrigger.className = "basemap-gallery-trigger";
  galleryTrigger.textContent = "Select Basemap";

  galleryTrigger.addEventListener("click", () => {
    const isVisible = basemapGalleryContainer.style.display === "block";
    basemapGalleryContainer.style.display = isVisible ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (
      !galleryTrigger.contains(event.target) &&
      !basemapGalleryContainer.contains(event.target)
    ) {
      basemapGalleryContainer.style.display = "none";
    }
  });

  basemapGallery.on("selection-change", () => {
    const selectedBasemap = basemapGallery.selectedBasemap;
    galleryTrigger.textContent = selectedBasemap.title || "Select Basemap";
    galleryTrigger.style.background =
      selectedBasemap.baseMapLayerIds.length > 0
        ? selectedBasemap.baseMapLayerIds[0].color
        : "rgba(255, 255, 255, 0.8)";
    basemapGalleryContainer.style.display = "none";
  });

  view.ui.add(galleryTrigger, "top-right");
  view.ui.add(basemapGalleryContainer, "top-right");
};
