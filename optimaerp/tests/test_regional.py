import frappe

import optimaerp
from optimaerp.tests.utils import OptimaERPTestSuite


@optimaerp.allow_regional
def test_method():
	return "original"


class TestInit(OptimaERPTestSuite):
	def test_regional_overrides(self):
		frappe.flags.country = "Maldives"
		self.assertEqual(test_method(), "original")
