from optimaerp.tests.utils import OptimaERPTestSuite
from optimaerp.utilities.activation import get_level


class TestActivation(OptimaERPTestSuite):
	def test_activation(self):
		site_info = {"activation": {"activation_level": 0, "sales_data": []}}
		levels = get_level(site_info)
		self.assertTrue(levels)
