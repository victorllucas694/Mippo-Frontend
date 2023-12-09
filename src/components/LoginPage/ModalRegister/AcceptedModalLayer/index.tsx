import { IOffersCheckBoxes } from "../../../../Types";
import { useProductsContext } from "../../../../contexts/CardContexts";
import { CookieCheckerBox } from "./styles";

function AcceptedModalLayer() {
  const { offersCheckBoxes } = useProductsContext();

  return (
    <CookieCheckerBox>
      <div className="business-account">
        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
      </div>
      <div className="business-account">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          sunt recusandae, pariatur quos eos beatae reiciendis.
        </p>
      </div>
      <div className="accept-condition-checkbox">
        {offersCheckBoxes.map((offersCheckBoxes: IOffersCheckBoxes) => {
          return (
            <>
              <label htmlFor="label-check">
                <input type="checkbox" id="label-check" name="label-check" />
                {offersCheckBoxes.label}
              </label>
            </>
          );
        })}
      </div>
    </CookieCheckerBox>
  );
}

export default AcceptedModalLayer;
