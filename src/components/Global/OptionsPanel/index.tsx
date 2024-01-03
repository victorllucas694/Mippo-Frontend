import { OptionsPanelWrapper } from "./styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Button } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";

interface categoriesBoxProps {
  id: number;
  label: string;
}

interface ISearchPanelDataPreset {
  categoriesBoxProps: categoriesBoxProps[];
}

function OptionsHeader({ categoriesBoxProps }: ISearchPanelDataPreset) {
  const { setterGlobalProductCategoryByNavbar } = useRequestsProductsContext();

  return (
    <OptionsPanelWrapper>
      <div className="all-categories">
        <div className="box-item">
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "rgb(250, 250, 250)",
              justifyContent: "space-between",
              border: "none",
              height: "3rem",
              width: "22rem",
              color: "rgb(30, 30, 30)",
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <span style={{ gap: "1rem" }}>
              <WidgetsIcon
                sx={{ margin: "-.4rem .7rem", color: "rgb(80, 80, 80)" }}
              />
              Departamentos gerais
            </span>
          </Button>
        </div>
        <BlurOnIcon sx={{ cursor: "pointer" }} />
      </div>
      <div className="categories-box">
        {categoriesBoxProps.map((categoriesListData: categoriesBoxProps, _) => {
          return _ === 0 ? (
            <div className="box-item">
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "rgb(250, 250, 250)",
                  justifyContent: "space-between",
                  border: "none",
                  height: "3rem",
                  width: "22rem",
                  color: "rgb(30, 30, 30)",
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <span style={{ gap: "1rem" }}>
                  <WidgetsIcon
                    sx={{ margin: "-.4rem .7rem", color: "rgb(80, 80, 80)" }}
                  />
                  {categoriesListData.label}
                </span>
              </Button>
            </div>
          ) : (
            <div className="categories-products">
              <Button
                onClick={() => {
                  setterGlobalProductCategoryByNavbar(
                    categoriesListData?.label
                  );
                }}
                variant="outlined"
                sx={{
                  width: "95%",
                  margin: "auto",
                  color: "black",
                  fontSize: ".85rem",
                  border: "none",
                }}
              >
                {categoriesListData.label}
              </Button>
            </div>
          );
        })}
      </div>
    </OptionsPanelWrapper>
  );
}

export default OptionsHeader;
