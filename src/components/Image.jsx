import imageStyles from "./cssfiles/ImageStyling.module.css";
import textStyles from "./cssfiles/TextStyling.module.css";

const Image = (props) => {
    return (
        <div className={imageStyles.imgContainer}>
            <img className={imageStyles.image} src={props.url} alt="Image Container"></img>
            <p className={`${textStyles.centeredText} ${textStyles.glowingText} ${textStyles.inspirationalQuote}`}>
                {props.children}
            </p>
        </div>
    );
};

export default Image;
