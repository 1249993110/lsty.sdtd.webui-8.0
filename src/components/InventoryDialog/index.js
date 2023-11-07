import InventoryDialog from './index.vue';
import { createVNode, render } from 'vue';

export const showInventory = async (entityId, playerName) => {
    const container = document.createElement('div');
    const vNode = createVNode(InventoryDialog, {
        title: `玩家: ${playerName} (${entityId}) 的背包`,
        entityId: entityId,
        visible: true,
        onClosed: () => {
            document.body.removeChild(container);
        },
    });
    render(vNode, container);
    document.body.appendChild(container);
};
