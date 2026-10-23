# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe

from optimaerp.accounts.report.asset_depreciation_ledger.asset_depreciation_ledger import execute
from optimaerp.tests.utils import OptimaERPTestSuite


class TestAssetDepreciationLedger(OptimaERPTestSuite):
	def test_report_executes(self):
		# Smoke-guards the raw-SQL -> query-builder port: the report query must compile and run on
		# both MariaDB and postgres.
		company = frappe.db.get_value("Company", {}, "name")
		columns, *_rest = execute(
			frappe._dict({"company": company, "from_date": "2020-01-01", "to_date": "2030-12-31"})
		)
		self.assertTrue(columns)
