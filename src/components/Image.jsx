import imageStyles from "./cssfiles/ImageStyling.module.css";
import textStyles from "./cssfiles/TextStyling.module.css";

const Image = (props) => {
    return (
        <div className={imageStyles.imgContainer}>
            <img className={imageStyles.image} src={props.url} alt="Image Container"></img>
            <div className={`${textStyles.inspirationalQuote} ${textStyles.centeredText} ${textStyles.glowingText}`}>
                {props.children}
            </div>
        </div>
    );
};

export default Image;
