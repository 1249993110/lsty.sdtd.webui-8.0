import { getPlayersLocation } from '~/api/entity-management';
import { showInventory } from '~/components/InventoryDialog/index';

// offlinePlayer icon
const offlinePlayerIcon = L.icon({
    iconUrl: new URL('~/assets/images/marker-survivor.png', import.meta.url).href,
    iconRetinaUrl: new URL('~/assets/images/marker-survivor-2x.png', import.meta.url).href,
    iconSize: [25, 48],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
});

export function getOfflinePlayersLayer(map, mapInfo) {
    const offlinePlayersMarkerGroup = L.markerClusterGroup({
        maxClusterRadius: function (zoom) {
            return zoom >= mapInfo.maxZoom ? 10 : 50;
        },
    });

    const setOfflinePlayersLocation = function (data) {
        document.getElementById('mapControlOfflinePlayerCount').innerText = data.length;
        offlinePlayersMarkerGroup.clearLayers();

        for (let i = 0, len = data.length; i < len; i++) {
            const location = data[i];
            const entityId = location.entityId;
            const entityName = location.entityName;
            const position = location.position;

            const container = L.DomUtil.create('div');

            const title = L.DomUtil.create('span', null, container);
            title.innerText = `玩家: ${entityName} (${entityId})`;

            L.DomUtil.create('br', null, container);

            const inventoryButton = L.DomUtil.create('a', null, container);
            inventoryButton.innerText = '查看背包';
            inventoryButton.href = 'javascript:void(0);';
            inventoryButton.title = 'Show inventory';
            L.DomEvent.on(inventoryButton, 'click', () => {
                showInventory(entityId, entityName);
            });

            const marker = L.marker([position.x, position.z], { icon: offlinePlayerIcon }).bindPopup(container);
            marker.addEventListener('popupopen', (e) => {
                e.popup._closeButton.href = 'javascript:void(0);';
            });
            marker.setOpacity(0.5);

            offlinePlayersMarkerGroup.addLayer(marker);
        }
    };

    const updateOfflinePlayersEvent = async function () {
        const data = await getPlayersLocation('offline');
        setOfflinePlayersLocation(data);
    };

    map.on('overlayadd', function (e) {
        if (e.layer == offlinePlayersMarkerGroup) {
            updateOfflinePlayersEvent();
        }
    });

    return offlinePlayersMarkerGroup;
}
