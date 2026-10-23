// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on("Installation Note", {
	setup: function (frm) {
		frappe.dynamic_link = { doc: frm.doc, fieldname: "customer", doctype: "Customer" };
		frm.set_query("customer_address", optimaerp.queries.address_query);
		frm.set_query("contact_person", optimaerp.queries.contact_query);
		frm.set_query("customer", optimaerp.queries.customer);
		frm.set_query("serial_and_batch_bundle", "items", (doc, cdt, cdn) => {
			let row = locals[cdt][cdn];
			return {
				filters: {
					item_code: row.item_code,
					voucher_type: doc.doctype,
					voucher_no: ["in", [doc.name, ""]],
					is_cancelled: 0,
				},
			};
		});
	},
	onload: function (frm) {
		if (!frm.doc.status) {
			frm.set_value({ status: "Draft" });
		}
		if (frm.doc.__islocal) {
			frm.set_value({ inst_date: frappe.datetime.get_today() });
		}

		let sbb_field = frm.get_docfield("items", "serial_and_batch_bundle");
		if (sbb_field) {
			sbb_field.get_route_options_for_new_doc = (row) => {
				return {
					item_code: row.doc.item_code,
					voucher_type: frm.doc.doctype,
				};
			};
		}
	},
	customer: function (frm) {
		optimaerp.utils.get_party_details(frm);
	},
	customer_address: function (frm) {
		optimaerp.utils.get_address_display(frm);
	},
	contact_person: function (frm) {
		optimaerp.utils.get_contact_details(frm);
	},
});

frappe.provide("optimaerp.selling");

// TODO commonify this code
optimaerp.selling.InstallationNote = class InstallationNote extends frappe.ui.form.Controller {
	refresh() {
		var me = this;
		if (this.frm.doc.docstatus === 0) {
			this.frm.add_custom_button(
				__("From Delivery Note"),
				function () {
					optimaerp.utils.map_current_doc({
						method: "optimaerp.stock.doctype.delivery_note.mapper.make_installation_note",
						source_doctype: "Delivery Note",
						target: me.frm,
						date_field: "posting_date",
						setters: {
							customer: me.frm.doc.customer || undefined,
						},
						get_query_filters: {
							docstatus: 1,
							status: ["not in", ["Stopped", "Closed"]],
							per_installed: ["<", 99.99],
							company: me.frm.doc.company,
						},
					});
				},
				null,
				"btn-default"
			);
		}
	}
};

extend_cscript(cur_frm.cscript, new optimaerp.selling.InstallationNote({ frm: cur_frm }));
