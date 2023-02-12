// eslint-disable-next-line import/prefer-default-export
export const copy2clip = (content: string) => {
    const $input = document.createElement('input');
    $input.setAttribute('value', content);
    document.body.insertAdjacentElement('afterbegin', $input);
    $input.select();

    document.execCommand('copy');
    document.body.removeChild($input);
};
