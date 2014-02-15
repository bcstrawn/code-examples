
public class Bubble {
	private int length = 0;
	private DataType operations = null;

	public Bubble(DataType operations) {
		this.operations = operations;
	}

	public void sort(Object array) {
		operations.setArray(array);
		this.length = operations.length();
		
		for (int j = 0; j < length-1; j++) {
			for (int i = 0; i < length-1; i++) {
				if (operations.outOfOrder(i)) {
					operations.swap(i);
				}
			}
		}
	}
}
