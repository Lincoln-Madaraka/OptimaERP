// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

optimaerp.buying.setup_buying_controller();
optimaerp.buying.SupplierQuotationController = class SupplierQuotationController extends (
	optimaerp.buying.BuyingController
) {
	setup() {
		this.frm.custom_make_buttons = {
			"Purchase Order": "Purchase Order",
			Quotation: "Quotation",
		};

		const me = this;
		this.frm.set_indicator_formatter("item_code", function (doc) {
			return !doc.qty && me.frm.doc.has_unit_price_items ? "yellow" : "";
		});

		this.frm.set_query("warehouse", "items", (doc, cdt, cdn) => {
			return {
				filters: {
					company: doc.company,
					is_group: 0,
				},
			};
		});
		super.setup();
	}

	refresh() {
		var me = this;
		super.refresh();

		if (this.frm.doc.__islocal && !this.frm.doc.valid_till) {
			this.frm.set_value("valid_till", frappe.datetime.add_months(this.frm.doc.transaction_date, 1));
		}
		if (
			this.frm.doc.docstatus === 1 &&
			!["Stopped", "Ordered", "Expired"].includes(this.frm.doc.status)
		) {
			this.frm.add_custom_button(
				__("Purchase Order"),
				this.make_purchase_order.bind(this),
				__("Create")
			);
			this.frm.add_custom_button(__("Update Items"), () => {
				optimaerp.utils.update_child_items({
					frm: this.frm,
					child_docname: "items",
					cannot_add_row: false,
				});
			});
			this.frm.page.set_inner_btn_group_as_primary(__("Create"));
			this.frm.add_custom_button(__("Quotation"), this.make_quotation.bind(this), __("Create"));
		} else if (this.frm.doc.docstatus === 0) {
			optimaerp.set_unit_price_items_note(this.frm);

			this.frm.add_custom_button(
				__("Material Request"),
				function () {
					optimaerp.utils.map_current_doc({
						method: "optimaerp.stock.doctype.material_request.mapper.make_supplier_quotation",
						source_doctype: "Material Request",
						target: me.frm,
						setters: {
							schedule_date: undefined,
							status: undefined,
						},
						get_query_filters: {
							material_request_type: "Purchase",
							docstatus: 1,
							status: ["!=", "Stopped"],
							per_ordered: ["<", 100],
							company: me.frm.doc.company,
						},
					});
				},
				__("Get Items From")
			);

			// Link Material Requests
			this.frm.add_custom_button(
				__("Link to Material Requests"),
				function () {
					optimaerp.buying.link_to_mrs(me.frm);
				},
				__("Tools")
			);

			this.frm.add_custom_button(
				__("Request for Quotation"),
				function () {
					if (!me.frm.doc.supplier) {
						frappe.throw({ message: __("Please select a Supplier"), title: __("Mandatory") });
					}
					optimaerp.utils.map_current_doc({
						method: "optimaerp.buying.doctype.request_for_quotation.mapper.make_supplier_quotation_from_rfq",
						source_doctype: "Request for Quotation",
						target: me.frm,
						setters: {
							transaction_date: null,
						},
						get_query_filters: {
							supplier: me.frm.doc.supplier,
							company: me.frm.doc.company,
						},
						get_query_method:
							"optimaerp.buying.doctype.request_for_quotation.request_for_quotation.get_rfq_containing_supplier",
					});
				},
				__("Get Items From")
			);
		}
	}

	make_purchase_order() {
		frappe.model.open_mapped_doc({
			method: "optimaerp.buying.doctype.supplier_quotation.mapper.make_purchase_order",
			frm: this.frm,
		});
	}
	make_quotation() {
		frappe.model.open_mapped_doc({
			method: "optimaerp.buying.doctype.supplier_quotation.mapper.make_quotation",
			frm: this.frm,
		});
	}
};

// for backward compatibility: combine new and previous states
extend_cscript(cur_frm.cscript, new optimaerp.buying.SupplierQuotationController({ frm: cur_frm }));
