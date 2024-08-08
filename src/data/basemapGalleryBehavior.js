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

  galleryTrigger.addEventListener("mouseover", () => {
    const isVisible = basemapGalleryContainer.style.display === "block";
    basemapGalleryContainer.style.display = isVisible ? "none" : "block";
  });

  document.addEventListener("mousemove", (event) => {
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
