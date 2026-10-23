frappe.provide("optimaerp.demo");

$(document).on("desktop_screen", function (event, data) {
	data.desktop.add_menu_item({
		label: __("Delete Demo Data"),
		icon: "trash",
		condition: function () {
			return frappe.boot.sysdefaults.demo_company;
		},
		onClick: function () {
			return optimaerp.demo.clear_demo();
		},
	});
});

optimaerp.demo.clear_demo = function () {
	frappe.confirm(__("Are you sure you want to clear all demo data?"), () => {
		frappe.call({
			method: "optimaerp.setup.demo.clear_demo_data",
			freeze: true,
			freeze_message: __("Clearing Demo Data..."),
			callback: function (r) {
				frappe.ui.toolbar.clear_cache();
				frappe.show_alert({
					message: __("Demo data cleared"),
					indicator: "green",
				});
			},
		});
	});
};
