"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chart = /** @class */ (function () {
    function Chart(id, type, labels, data, backgroundColours, title, legend, displayLegend, scales, tooltips, legendCentered) {
        this.id = id;
        this.type = type;
        this.labels = labels;
        this.data = data;
        this.backgroundColours = backgroundColours;
        this.title = title;
        this.legend = legend;
        this.displayLegend = displayLegend;
        this.scales = scales;
        this.tooltips = tooltips;
        this.legendCentered = legendCentered;
    }
    return Chart;
}());
exports.Chart = Chart;
;
//# sourceMappingURL=Chart.model.js.map