class DropdownButton {
    static generateElement(){


        // TODO put optional-form-input if input with this


        let btnGrp = document.createElement('div');
        btnGrp.classList.add('btn-group');

        let iconBtn = document.createElement('button');
        iconBtn.classList.add('btn');
        iconBtn.classList.add('btn-default');
        iconBtn.style.height = '34px';
        iconBtn.style.width = '46px';
        iconBtn.type = 'button';

        let unselectBtn = document.createElement('button');
        unselectBtn.classList.add('btn');
        unselectBtn.classList.add('btn-default');
        unselectBtn.type = 'button';
        unselectBtn.style.height = '34px';

        DropdownButton.generateSvg({
            class: 'close-btn',
            data: {
                viewBox: [
                    0,
                    0,
                    320,
                    512
                ],
                path: 'M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'
            }

        }, unselectBtn);

        btnGrp.appendChild(iconBtn);
        btnGrp.appendChild(unselectBtn);

        return {
            iconBtn,
            unselectBtn,
            btnGrp
        };

    }

    static generateSvg(icon, target){
        if(icon == null){
            target.innerHTML = '?';
            return;
        }
        target.innerHTML = '';

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'role', 'img');
        svg.setAttributeNS(null, 'class', icon.class);
        svg.setAttributeNS(null, 'viewBox', icon.data.viewBox.join(' '));

        svg.style.display = 'block';
        svg.style.height = '20px';
        svg.style.maxWidth = '20px';
        svg.style.margin = 'auto';
        svg.style.fill = '#505050';


        let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', icon.data.path);

        svg.appendChild(path);

        target.appendChild(svg);
    }
}

export default DropdownButton;