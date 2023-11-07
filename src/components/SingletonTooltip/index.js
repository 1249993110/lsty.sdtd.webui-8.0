import { ElTooltip } from 'element-plus';
import { createVNode, render } from 'vue';

const container = document.createElement('div');
document.body.appendChild(container);

export const closeTooltip = () => {
    render(null, container);
};

export const showTooltip = async (props) => {
    closeTooltip();

    const vNode = createVNode(ElTooltip, {
        virtualTriggering: true,
        virtualRef: props.virtualRef,
        visible: true,
        content: props.content,
        placement: props.placement || 'bottom-start',
        showArrow: props.showArrow || true,
        rawContent: props.rawContent || true,
        enterable: props.enterable || false,
        offset: props.offset || 12,
        showAfter: props.showAfter || 0,
    });
    render(vNode, container);
};
