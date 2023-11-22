#include <fstream>
#include <iostream>
#include <vector>

void listItems(std::vector<std::string> &items) {
	for(int i = 0; i < items.size(); ++i) {
		std::cout << "  " << i << "  " << items[i] << "\n";
	}
}

void loadItems(std::vector<std::string> &items, std::ifstream &in) {
	in.open("./todo-list/todoitems.txt");

	while(!in.eof()) {
		std::string item;
		in >> item;
		if(item != "")
			items.push_back(item);
	}

	in.close();
}

bool addItem(std::vector<std::string> &items, std::string item) {
	bool exists = false;
	for(auto it : items) {
		if(it == item) {
			exists = true;
			break;
		}
	}
	if(!exists) {
		items.push_back(item);
		return 1;
	}
	return 0;
}

bool removeItem(std::vector<std::string> &items, std::string item) {
	auto it  = items.begin();
	for(; it < items.end(); ++it) {
		if(*it == item) {
			break;
		}
	}
	if(it != items.end()) {
		items.erase(it);
		return 1;
	}
	return 0;
}

void saveItems(std::vector<std::string> &items, std::ofstream &out) {
	out.open("./todo-list/todoitems.txt");

	for(int i = 0; i < items.size(); ++i) {
		out << items[i] << ' ';
	}

	out.close();
}

int main(int argc, char const *argv[])
{
	std::vector<std::string> items{};
	std::ifstream in;
	std::ofstream out;
	loadItems(items, in);

	switch (argc)	{
	case 1:
		listItems(items);
		break;
	case 3:
		std::cout << argv[2] << std::endl;
		if(std::string{"add"} == argv[1]) {
			if(addItem(items, argv[2])) {
				std::cout << "Item added" << std::endl;
				saveItems(items, out);
			} else {
				std::cout << "Failed to add item" << std::endl;
			}
		} else if(std::string{"remove"} == argv[1]) {
			if(removeItem(items, argv[2])) {
				std::cout << "Item removed" << std::endl;
				saveItems(items, out);
			} else {
				std::cout << "Failed to remove item" << std::endl;
			}
		} else {
			std::cout << "Use: ./todo [add/remove item]" << std::endl;
		}
		break;
	default:
		std::cout << "Use: ./todo [add/remove item]" << std::endl;
		break;
	}
	
	return 0;
}
