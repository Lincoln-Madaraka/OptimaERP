# Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt

import frappe

from optimaerp.tests.utils import OptimaERPTestSuite


class TestQualityFeedback(OptimaERPTestSuite):
	def test_quality_feedback(self):
		template = frappe.get_doc(
			doctype="Quality Feedback Template",
			template="Test Template",
			parameters=[dict(parameter="Test Parameter 1"), dict(parameter="Test Parameter 2")],
		).insert()

		feedback = frappe.get_doc(
			doctype="Quality Feedback",
			template=template.name,
			document_type="User",
			document_name=frappe.session.user,
		).insert()

		self.assertEqual(template.parameters[0].parameter, feedback.parameters[0].parameter)

		feedback.delete()
		template.delete()
