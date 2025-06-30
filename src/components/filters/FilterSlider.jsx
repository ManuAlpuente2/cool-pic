import { memo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FilterItem } from "./FilterItem";

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "./FilterSlider.scss";

const FilterSlider = memo(({ filters, originalFile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { image } = state || {};

  if (!filters?.length) return null;

  // Si tenemos archivo original, navegar directamente a preview
  const handleFilterSelect = (filterId) => {
    if (originalFile && image) {
      navigate("/preview", {
        state: {
          image,
          fileName: originalFile.name,
          originalFile,
          filterId: filterId.toString(),
        },
      });
    } else {
      // Navegación normal a la página de filtro
      navigate(`/filter/${filterId}`);
    }
  };

  return (
    <section
      className="filter-slider"
      aria-label="Carrusel de filtros disponibles"
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4.5,
            spaceBetween: 30,
          },
        }}
        className="filter-slider__swiper"
      >
        {filters.map((filter) => (
          <SwiperSlide key={filter.id} className="filter-slider__slide">
            <FilterItem filter={filter} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
});

FilterSlider.displayName = "FilterSlider";

export { FilterSlider };
