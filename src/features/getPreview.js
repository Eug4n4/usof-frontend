function getPreview(content) {
    content = content.replaceAll(/<\/?[^>]*>/g, "");
    if (content.length > 400) {
        content = content.slice(0, content.length - (content.length - 400));
        content += "...";
    }
    return content;
}
export default getPreview;